import { BlogI, LoginParamsI, RegisterParamsI } from "@/types";

export const Bloggy = {
  login(params: LoginParamsI) {
    return $fetch("/api/login", {
      method: "POST",
      body: params,
    });
  },
  register(params: RegisterParamsI) {
    return $fetch("/api/register", {
      method: "POST",
      body: params,
    });
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

  async createPost({
    body = "",
    categories = [""],
    description = "",
    editors = [],
    images = [],
    props = {},
    tags = [],
    thumbnail = null,
    title = "",
  }: Omit<BlogI, "thumbnail"> & { thumbnail: File | null }) {
    let data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("body", body);
    data.append("props", JSON.stringify(props));

    images.map((img) => {
      data.append("images", JSON.stringify(img));
    });

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    data.append("categories", JSON.stringify(categories));
    data.append("tags", JSON.stringify(tags));
    data.append("editors", JSON.stringify(editors));
    return $fetch("/api/createpost", {
      method: "POST",

      body: data,
    });
  },
};
