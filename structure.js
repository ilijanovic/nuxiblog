let routeStructure = [
  {
    route: "/api/register",
    body: {
      password,
      name,
      family_name,
      email,
      username,
    },
  },
  {
    route: "/api/login",
    body: {
      password,
      username,
    },
  },
  {
    route: "/api/getauthor",
    body: {
      authorId,
    },
  },
  {
    route: "/api/getblog",
    body: {
      authorId,
      blogId,
    },
  },
  {
    route: "/api/getblogcomments",
    body: {
      authorId,
      blogId,
    },
  },
  {
    route: "/api/getblogcomment",
    body: {
      authorId,
      blogId,
      commentId,
    },
  },
  {
    route: "/api/getblogs",
    body: {
      authorId,
    },
  },
];
