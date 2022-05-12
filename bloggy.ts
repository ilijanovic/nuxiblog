import { LoginParamsI, RegisterParamsI } from "@/types";
let ws: WebSocket;
if (process.client) {
  ws = new WebSocket("ws://localhost:8080/");
}
export const Bloggy = {
  login(params: LoginParamsI) {
    return $fetch("/api/login", {
      method: "POST",
      body: params,
    }).then((response) => response);
  },
  register(params: RegisterParamsI) {
    return $fetch("/api/register", {
      method: "POST",
      body: params,
    }).then((response) => response);
  },
  getBlogsByAuthorId(authorId: string) {
    return $fetch("/api/getblogs", {
      method: "POST",
      body: { authorId },
    });
  },
  getBlogBySlug(slug: string) {
    return $fetch("/api/getblogbyslug", {
      method: "POST",
      body: { slug },
    });
  },
  isLoggedIn() {
    return $fetch("/api/islogged", {
      method: "POST",
    });
  },
  logout() {
    return $fetch("/api/logout", {
      method: "POST",
    });
  },
  getCurrentUser() {
    return $fetch("/api/getcurrentuser", { method: "POST" });
  },
  listen(cb: Function) {
    if (process.client) {
      ws.onmessage = (data) => {
        console.log(ws, data);
        cb(data);
      };
    }
  },
  async createPost({
    authorId = "",
    body = "",
    categories = [""],
    comments = [],
    date = new Date(),
    description = "",
    editors = [""],
    images = [],
    likeCount = 0,
    likes = [""],
    props = {},
    slug = "",
    tags = [""],
    thumbnail = "",
    title = "",
  }) {
    let data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("date", date.toString());
    data.append("body", body);
    data.append("props", JSON.stringify(props));

    images.map((img) => {
      data.append("images", img);
    });

    data.append("authorId", authorId);
    data.append("thumbnail", thumbnail);
    data.append("categories", JSON.stringify(categories));
    data.append("tags", JSON.stringify(tags));
    return $fetch("/api/createpost", {
      method: "POST",

      body: data,
    });
  },
};
