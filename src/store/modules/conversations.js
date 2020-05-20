import Vue from 'vue';
import ConversationsHttpService from '@/services/conversations';

const getDefaultState = () => {
	return {
		conversations: []
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_CONVERSATIONS(state, conversations) {
		state.conversations = conversations;
	}
};

const actions = {
	getConversations(context) {
		return ConversationsHttpService.getConversations().then((res) => {
			context.commit('SET_CONVERSATIONS', res.data);
			return res;
		}).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to fetch the user conversations'
			});
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
