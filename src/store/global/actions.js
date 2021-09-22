import { api } from 'boot/axios'
export async function fetchGlobalInfo ({commit}) {
    const globalInfo = (await api.get('/global')).data
    return commit('updateGlobalInfo', globalInfo)
}

export async function fetchMenus ({commit}) {
    const menus = (await api.get('/menu')).data
    commit('updateMenuList', menus.menu_array)
}
