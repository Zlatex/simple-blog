import { api } from 'boot/axios'
export async function fetchGlobalInfo ({commit}) {
    const globalInfo = await api.get('/global')
    return commit('updateGlobalInfo', globalInfo.data)
}

export async function fetchMenus ({commit}) {
    const menus = await api.get('/menu')
    return commit('updateMenuList', menus.data.menu_array)
}
