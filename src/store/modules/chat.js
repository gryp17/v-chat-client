import Vue from 'vue';
import moment from 'moment';
import ConversationHttpService from '@/services/conversation';
import UserHttpService from '@/services/user';
import MessageHttpService from '@/services/message';

const getDefaultState = () => {
	return {
		conversations: [],
		selectedConversation: null,
		users: {},
		selectedUser: null
	};
};

const state = getDefaultState();

const getters = {
	conversations(state) {
		return state.conversations.map((conversation) => {
			const users = conversation.users.map((userId) => {
				return state.users[userId];
			});

			return {
				...conversation,
				users
			};
		});
	},
	conversation(state, getters) {
		return getters.conversations.find((conversation) => {
			return conversation.id === state.selectedConversation;
		});
	},
	conversationMessages(state, getters) {
		return [...getters.conversation.messages].sort((a, b) => {
			return moment(a.createdAt) - moment(b.createdAt);
		});
	},
	userProfile(state) {
		return state.users[state.selectedUser];
	}
};

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_CONVERSATIONS(state, conversations) {
		state.conversations = conversations;
	},
	SET_SELECTED_CONVERSATION(state, conversationId) {
		state.selectedConversation = conversationId;
	},
	SET_USERS(state, users) {
		state.users = users;
	},
	ADD_USER(state, user) {
		Vue.set(state.users, user.id, user);
	},
	UPDATE_ONLINE_USERS(state, onlineUsers) {
		Object.keys(state.users).forEach((userId) => {
			const online = onlineUsers.includes(parseInt(userId));

			const updatedUser = {
				...state.users[userId],
				online
			};

			Vue.set(state.users, userId, updatedUser);
		});
	},
	ADD_CONVERSATION_USER(state, { conversationId, userId }) {
		state.conversations.forEach((conversation) => {
			if (conversation.id === conversationId) {
				conversation.users.push(userId);
			}
		});
	},
	ADD_CONVERSATION_MESSAGE(state, message) {
		state.conversations.forEach((conversation) => {
			if (conversation.id === message.conversationId) {
				conversation.messages.push(message);
			}
		});
	},
	SET_CONVERSATION_UNREAD_STATUS(state, { conversationId, status }) {
		state.conversations = state.conversations.map((conversation) => {
			if (conversation.id === conversationId) {
				conversation.unread = status;
			}

			return conversation;
		});
	},
	SET_SELECTED_USER(state, userId) {
		state.selectedUser = userId;
	}
};

const actions = {
	getConversations(context) {
		return ConversationHttpService.getConversations().then((res) => {
			const conversations = res.data;

			context.commit('SET_CONVERSATIONS', conversations);

			if (conversations && conversations.length > 0) {
				context.dispatch('setSelectedConversation', conversations[0].id);
			}
		}).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to fetch the conversations'
			});
		});
	},
	getUsers(context) {
		return UserHttpService.getUsers().then((res) => {
			const users = res.data ? res.data : [];
			const usersMap = {};

			users.forEach((user) => {
				usersMap[user.id] = user;
			});

			context.commit('SET_USERS', usersMap);
		}).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to fetch the users'
			});
		});
	},
	setSelectedConversation(context, conversationId) {
		context.commit('SET_SELECTED_CONVERSATION', conversationId);

		const conversation = context.getters.conversation;

		//mark the opened conversation as read if necessary
		if (conversation && conversation.unread) {
			context.dispatch('markAsRead', conversationId);
		}
	},
	openConversationWithUser(context, userId) {
		const conversation = context.state.conversations.find((conversation) => {
			return conversation.isPrivate && conversation.users.includes(userId);
		});

		//TODO: if the conversation with this user exists open it - otherwise create it and open it
		//TODO: figure out how to show the newly created conversation only to the first user until a message is sent
		if (conversation) {
			context.dispatch('setSelectedConversation', conversation.id);
		}
	},
	updateOnlineUsers(context, onlineUsers) {
		context.commit('UPDATE_ONLINE_USERS', onlineUsers);
	},
	newUserReceived(context, user) {
		context.commit('ADD_USER', user);

		user.conversations.forEach((conversationId) => {
			context.commit('ADD_CONVERSATION_USER', {
				conversationId,
				userId: user.id
			});
		});
	},
	sendMessage(context, { conversationId, content }) {
		return MessageHttpService.sendMessage(conversationId, content).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to send the message'
			});
		});
	},
	messageReceived(context, message) {
		context.commit('ADD_CONVERSATION_MESSAGE', message);

		const userSession = context.rootState.auth.userSession;

		if (message.userId === userSession.id) {
			return;
		}

		//if the conversation is not opened mark it as unread
		if (message.conversationId !== context.state.selectedConversation) {
			context.commit('SET_CONVERSATION_UNREAD_STATUS', {
				conversationId: message.conversationId,
				status: true
			});
		} else {
			//otherwise mark it as read automatically
			context.dispatch('markAsRead', message.conversationId);
		}
	},
	markAsRead(context, conversationId) {
		ConversationHttpService.markAsRead(conversationId).then(() => {
			context.commit('SET_CONVERSATION_UNREAD_STATUS', {
				conversationId,
				status: false
			});
		}).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to mark as read'
			});
		});
	},
	setSelectedUser(context, userId) {
		context.commit('SET_SELECTED_USER', userId);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
