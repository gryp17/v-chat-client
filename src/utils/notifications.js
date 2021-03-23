function showNotification(title, body, icon = null) {
	new Notification(title, {
		icon,
		body
	});
}

function showNewMessageNotification(message, author, conversation) {
	const action = message.type === 'file' ? 'sent a file:' : 'wrote:';
	const title = conversation.isPrivate ? `${author.displayName} ${action}` : `[${conversation.name}] ${author.displayName} ${action}`;
	const body = message.type === 'file' ? message.file.originalName : message.content;

	showNotification(title, body, author.avatarLink);
}

function showOnlineUserNotification(user) {
	const title = `${user.displayName} has come online`;
	showNotification(title, '', user.avatarLink);
}

export {
	showNotification,
	showNewMessageNotification,
	showOnlineUserNotification
};
