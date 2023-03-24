import { users } from "./users";


export const POSTS = [
    {
        imageUrl: users[0].image,
        user: users[0].user,
        likes: 7898,
        caption: 'My first App',
        profile_picture: users[0].image,
        reshared:
        {
            user: 'estharak'
        },
        comments: [
            {
                user: 'freako',
                comment: 'wow, dude!!!'
            },
            {
                user: 'israel',
                comment: 'This is how we do it'
            },
        ],
     
    },

    {
        imageUrl: users[1].image,
        user: users[1].user,
        likes: 12334455,
        caption: 'My first App, this is so exciting i dont even know what to say like this just so terrific',
        profile_picture: users[1].image,
        reshared:
        {
            user: 'estharak'
        },
        comments: [
            {
                user: 'freako',
                comment: 'wow, dude!!!'
            },
            {
                user: 'israel',
                comment: 'This is how we do it'
            },
        ],
     
    }
];


