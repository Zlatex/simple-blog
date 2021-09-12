import { api } from "boot/axios";
export function setCurrentPost({ state, commit }, slug) {
  return new Promise(async (resolve, reject) => {
    let post = state.posts.find((post) => post.slug == slug);
    if (!post) post = (await api.get(`/articles/${slug}`)).data;
    if (!post) reject("404");
    resolve(commit("setCurrentPost", post));
  });
}
