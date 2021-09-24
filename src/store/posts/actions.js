import { api } from "boot/axios";
export function setCurrentPost({ state, commit }, slug) {
  return new Promise(async (resolve, reject) => {
    let post = state.posts.find((post) => post.slug == slug);
    if (!post) post = await api.get(`/articles/${slug}`);
    if (post.status && post.status != 200) return reject(post.status);
    resolve(commit("setCurrentPost", post?.data || post));
  });
}

export async function fetchPosts({ commit }, info) {
  const postsCount = (await api.get("/articles/count")).data;
  let offset = postsCount > 9 ? (info.page - 1) * 9 : 0;
  const posts = (
    await api.get("/articles", {
      params: {
        _limit: 9,
        _start: offset,
      },
    })
  ).data;
  commit("setPosts", posts);
  commit('setPagesCount', postsCount > 9 ? parseInt((postsCount -1) / 9) + 1 : 1 )
}
