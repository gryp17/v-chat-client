import Vue from 'vue';
import VueRouter from 'vue-router';
import InitialSetup from '@/views/InitialSetup';
import Authentication from '@/views/Authentication';
import Chat from '@/views/Chat';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'initial-setup',
		component: InitialSetup
	},
	{
		path: '/authentication',
		name: 'authentication',
		component: Authentication
	},
	{
		path: '/chat',
		name: 'chat',
		component: Chat
	}
];

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes
});

export default router;
