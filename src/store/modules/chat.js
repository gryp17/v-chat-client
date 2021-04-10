import Vue from 'vue';
import moment from 'moment';
import { remote } from 'electron';
import ConversationHttpService from '@/services/conversation';
import UserHttpService from '@/services/user';
import MessageHttpService from '@/services/message';
import { showNewMessageNotification, showOnlineUserNotification } from '@/utils/notifications';

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
	conversations(state, getters, rootState) {
		const currentUser = rootState.auth.userSession;

		return state.conversations.filter((conversation) => {
			//show only conversations that have messages
			//OR were initiated/created by the current user
			//OR the conversation is the selectedConversation (corner case check for when both users tried to start the conversation at the same time)
			return conversation.messages.length > 0
				|| (currentUser && currentUser.id === conversation.createdBy)
				|| state.selectedConversation === conversation.id;
		}).map((conversation) => {
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
		return [...getters.conversation.messages].map((message) => {
			//set the user/author field for each message
			return {
				...message,
				user: state.users[message.userId]
			};
		}).sort((a, b) => {
			return moment(b.createdAt) - moment(a.createdAt);
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
	ADD_CONVERSATION(state, conversation) {
		state.conversations.push(conversation);
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
	UPDATE_USER(state, user) {
		//merge the current user data with the new data
		const updatedUser = {
			...state.users[user.id],
			...user
		};

		Vue.set(state.users, user.id, updatedUser);
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
	ADD_CONVERSATION_MESSAGES(state, { conversationId, messages }) {
		state.conversations.forEach((conversation) => {
			if (conversation.id === conversationId) {
				conversation.messages = conversation.messages.concat(messages);
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
	SET_CONVERSATION_MUTED_STATUS(state, { conversationId, status }) {
		state.conversations = state.conversations.map((conversation) => {
			if (conversation.id === conversationId) {
				conversation.muted = status;
			}

			return conversation;
		});
	},
	SET_SELECTED_USER(state, userId) {
		state.selectedUser = userId;
	}
};

const actions = {
	/**
	 * Fetches all user conversations
	 * @param {Object} context
	 */
	async getConversations(context) {
		try {
			const { data } = await ConversationHttpService.getConversations();
			const conversations = data;

			context.commit('SET_CONVERSATIONS', conversations);

			if (conversations && conversations.length > 0) {
				context.dispatch('setSelectedConversation', conversations[0].id);
			}
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to fetch the conversations: ${err}`
			});
		}
	},
	/**
	 * Fetches all users
	 * @param {Object} context
	 */
	async getUsers(context) {
		try {
			const { data } = await UserHttpService.getUsers();
			const users = data || [];
			const usersMap = {};

			users.forEach((user) => {
				usersMap[user.id] = user;
			});

			context.commit('SET_USERS', usersMap);
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to fetch the users: ${err}`
			});
		}
	},
	/**
	 * Sets the current/selected conversation
	 * @param {Object} context
	 * @param {Number} conversationId
	 */
	setSelectedConversation(context, conversationId) {
		context.commit('SET_SELECTED_CONVERSATION', conversationId);

		const conversation = context.getters.conversation;

		//mark the opened conversation as read if necessary
		if (conversation && conversation.unread) {
			context.dispatch('markAsRead', conversationId);
		}
	},
	/**
	 * Creates/opens a conversation with the provided user
	 * @param {Object} context
	 * @param {Number} userId
	 */
	async openConversationWithUser(context, userId) {
		const conversation = context.state.conversations.find((conversation) => {
			return conversation.isPrivate && conversation.users.includes(userId);
		});

		//if a conversation with this user exists - open it
		if (conversation) {
			context.dispatch('setSelectedConversation', conversation.id);
		} else {
			//otherwise create the conversation and then open it
			try {
				const { data } = await ConversationHttpService.addConversation(userId);
				const conversation = data;
				context.dispatch('setSelectedConversation', conversation.id);
			} catch (err) {
				Vue.toasted.global.apiError({
					message: `Failed to create conversation: ${err}`
				});
			}
		}
	},
	/**
	 * Sets the online users
	 * @param {Object} context
	 * @param {Array} onlineUsers
	 */
	setOnlineUsers(context, onlineUsers) {
		context.commit('UPDATE_ONLINE_USERS', onlineUsers);
	},
	/**
	 * Updates the online users
	 * @param {Object} context
	 * @param {Array} onlineUsers
	 */
	updateOnlineUsers(context, onlineUsers) {
		const userSession = context.rootState.auth.userSession;
		const showOnlineStatusNotifications = context.rootState.settings.showOnlineStatusNotifications;

		if (showOnlineStatusNotifications) {
			//show notification when a user comes online
			onlineUsers.forEach((userId) => {
				const currentUserState = context.state.users[userId];
				if (currentUserState
						&& currentUserState.id !== userSession.id
						&& !currentUserState.online) {
					showOnlineUserNotification(currentUserState);
				}
			});
		}

		context.commit('UPDATE_ONLINE_USERS', onlineUsers);
	},
	/**
	 * Handles the new user event
	 * @param {Object} context
	 * @param {Object} user
	 */
	newUserReceived(context, user) {
		context.commit('ADD_USER', user);

		user.conversations.forEach((conversationId) => {
			context.commit('ADD_CONVERSATION_USER', {
				conversationId,
				userId: user.id
			});
		});
	},
	/**
	 * Handles the new conversation event
	 * @param {Object} context
	 * @param {Object} conversation
	 */
	newConversationReceived(context, conversation) {
		context.commit('ADD_CONVERSATION', conversation);
	},
	/**
	 * Sends a new message
	 * @param {Object} context
	 * @param {Object} data
	 */
	async sendMessage(context, { conversationId, content }) {
		try {
			await MessageHttpService.sendMessage(conversationId, content);
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to send the message: ${err}`
			});
		}
	},
	/**
	 * Sends a new file message
	 * @param {Object} context
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	async sendFileMessage(context, formData) {
		try {
			return await MessageHttpService.sendFileMessage(formData);
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to send the file: ${err}`
			});
		}
	},
	/**
	 * Handles the message received event
	 * @param {Object} context
	 * @param {Object} message
	 * @returns {Promise}
	 */
	messageReceived(context, message) {
		context.commit('ADD_CONVERSATION_MESSAGE', message);

		const userSession = context.rootState.auth.userSession;
		const isOwnMessage = message.userId === userSession.id;
		const conversationIsOpened = message.conversationId === context.state.selectedConversation;
		const appIsFocused = context.rootState.ui.focused;
		const messageNotificationsEnabled = context.rootState.settings.showMessageNotifications;
		const [mainWindow] = remote.BrowserWindow.getAllWindows();
		const author = context.state.users[message.userId];
		const conversation = context.state.conversations.find((conversation) => {
			return conversation.id === message.conversationId;
		});
		const showNotifications = !conversation.muted && messageNotificationsEnabled && (!conversationIsOpened || !appIsFocused);
		const flashTaskbar = !conversation.muted && !appIsFocused;

		if (isOwnMessage) {
			return;
		}

		//if the conversation is already opened mark it as read automatically
		if (conversationIsOpened) {
			context.dispatch('markAsRead', message.conversationId);
		} else {
			//otherwise mark it as unread
			context.commit('SET_CONVERSATION_UNREAD_STATUS', {
				conversationId: message.conversationId,
				status: true
			});
		}

		//flash the taskbar
		if (flashTaskbar) {
			mainWindow.flashFrame(true);
		}

		//show new message notification
		if (showNotifications) {
			showNewMessageNotification(message, author, conversation);
		}
	},
	/**
	 * Marks the conversation as read
	 * @param {Object} context
	 * @param {Number} conversationId
	 */
	async markAsRead(context, conversationId) {
		try {
			await ConversationHttpService.markAsRead(conversationId);
			context.commit('SET_CONVERSATION_UNREAD_STATUS', {
				conversationId,
				status: false
			});
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to mark as read: ${err}`
			});
		}
	},
	/**
	 * Mutes/Unmutes the conversation
	 * @param {Object} context
	 * @param {Object} data
	 */
	async muteConversation(context, { conversationId, status }) {
		try {
			await ConversationHttpService.muteConversation(conversationId, status);
			context.commit('SET_CONVERSATION_MUTED_STATUS', {
				conversationId,
				status
			});
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to mute/unmute the conversation: ${err}`
			});
		}
	},
	/**
	 * Fetches the conversation messages
	 * @param {Object} context
	 * @param {Object} data
	 * @returns {Promise}
	 */
	async getMessages(context, { conversationId, limit, offset }) {
		try {
			const { data } = await MessageHttpService.getMessages(conversationId, limit, offset);

			context.commit('ADD_CONVERSATION_MESSAGES', {
				conversationId,
				messages: data
			});

			return data;
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Failed to fetch messages: ${err}`
			});
		}
	},
	/**
	 * Sets the selected user
	 * @param {Object} context
	 * @param {Number} userId
	 */
	setSelectedUser(context, userId) {
		context.commit('SET_SELECTED_USER', userId);
	},
	/**
	 * Handles the update user event
	 * @param {Object} context
	 * @param {Object} user
	 */
	updateUser(context, user) {
		context.commit('UPDATE_USER', user);

		if (user.id === context.rootState.auth.userSession.id) {
			context.commit('auth/SET_USER_SESSION', user, { root: true });
		}
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
