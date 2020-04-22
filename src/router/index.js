import Vue from 'vue';
import VueRouter from 'vue-router';
import InitialSetup from '@/views/InitialSetup';
import Signup from '@/views/Signup';
import Chat from '@/views/Chat';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'InitialSetup',
		component: InitialSetup
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup
	},
	{
		path: '/chat',
		name: 'Chat',
		component: Chat
	}
];

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes
});

export default router;
