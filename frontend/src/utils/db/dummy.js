export const POSTS = [
	{
		_id: "1",
		text: "He got up",
		img: "/posts/cat1.webp",
		user: {
			username: "karin",
			profileImg: "/avatars/boy1.png",
			fullName: "Karin",
		},
		comments: [
			{
				_id: "1",
				text: "Nice Tutorial",
				user: {
					username: "jane",
					profileImg: "/avatars/girl1.png",
					fullName: "Jane",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	
	{
		_id: "3",
		text: "My turtle",
		img: "/posts/turtle1.jpg",
		user: {
			username: "bob",
			profileImg: "/avatars/boy3.png",
			fullName: "Bob",
		},
		comments: [],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894", "6658s895", "6658s896"],
	},
	{
		_id: "4",
		text: "So beautiful 🤔",
		img: "/posts/dog1.jpg",
		user: {
			username: "bob",
			profileImg: "/avatars/boy3.png",
			fullName: "Bob",
		},
		comments: [
			{
				_id: "1",
				text: "Nice",
				user: {
					username: "jane",
					profileImg: "/avatars/girl3.png",
					fullName: "Jane",
				},
			},
		],
		likes: [
			"6658s891",
			"6658s892",
			"6658s893",
			"6658s894",
			"6658s895",
			"6658s896",
			"6658s897",
			"6658s898",
			"6658s899",
		],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		fullName: "John",
		username: "john",
		profileImg: "/avatars/boy2.png",
	},
	{
		_id: "2",
		fullName: "Jane",
		username: "jane",
		profileImg: "/avatars/girl1.png",
	},
	{
		_id: "3",
		fullName: "Bob",
		username: "bob",
		profileImg: "/avatars/boy3.png",
	},
	{
		_id: "4",
		fullName: "Daisy",
		username: "daisy",
		profileImg: "/avatars/girl2.png",
	},
];