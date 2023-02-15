# Docuclimb

Docuclimb is Instagram for Bouldering.

## Demo

![Docuclimb Demo](demo/dc_demo.gif)

## Features

- Instagram-like post upload
- Authentication (Register/Login/Logout/Change Email || Password/Delete Account)

## Roadmap

- Data visualization for user climbs (climbs/time period, grade frequency)
- Follow/like functionality on posts
- Instagram-style modal popup on posts (awaiting Next 13 alpha, see below)

## Tech Stack

This project is built on the [NextJS App Directory](https://beta.nextjs.org/docs). Next 13 uses React Server components to decrease client-side JS bundles, along with other improvements from Next 12.

This project is also built on [Pocketbase](https://pocketbase.io/). Pocketbase is an open source backend (authentication, realtime DB, and file storage).

This project is self-hosted on a [Linode](https://www.linode.com/) server.

#### Other tech used:

- [Tailwind UI](https://tailwindui.com/)
- [Netlify](https://www.netlify.com/)
- [Postmark](https://postmarkapp.com/)

## Notes

#### Why did I choose Next 13?

Next is one of the [most popular](https://2022.stateofjs.com/en-US/libraries/) JavaScript rendering frameworks. The migration from Next 12 to Next 13 is monumental because of the change to the "app directory" structure.

 Next 13 is in beta. Limitations to migrating from Next 12 to Next 13 exist, some of which have hindered Docuclimb.

 #### Why did I choose Pocketbase?

With familiarity with Firebase, a want to try something new. To prioritize speed over flexibility, I chose Pocketbase.

#### Is this project complete?

Docuclimb is currently a functional MVP. Users can sign up, create posts, and perform basic functions with their account.

Features will be added after Next 13 is in alpha. A feature waiting on a Next 13 update is [advanced routing patterns](https://beta.nextjs.org/docs/routing/fundamentals#advanced-routing-patterns). The development of this feature is blocking an intuitive way to perform "parallel routes", a feature commonly used in social media platforms like Instagram and Reddit.

## Resources

- [[Feedback] App Directory in Next.js 13](https://github.com/vercel/next.js/discussions/41745)