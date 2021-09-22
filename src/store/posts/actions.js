import { api } from "boot/axios";
export function setCurrentPost({ state, commit }, slug) {
  return new Promise(async (resolve, reject) => {
    let post = state.posts.find((post) => post.slug == slug);
    if (!post) post = await api.get(`/articles/${slug}`);
    if (post.status && post.status != 200) return reject(post.status);
    resolve(commit("setCurrentPost", post?.data || post));
  });
}
