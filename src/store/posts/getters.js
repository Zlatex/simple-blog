export function getPostByID(state,id){
    state.posts.find(post => post.id == id)
}
export function getPostBySlug(state,slug){
    state.posts.find(post => post.slug == slug)
}