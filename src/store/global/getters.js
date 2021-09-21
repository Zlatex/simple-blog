export function siteName(state) {
  return state.globalInfo.siteName;
}
export function siteLogo(state) {
  return state.globalInfo.logo != null
    ? process.env.API_URL + state.globalInfo.logo.formats.large.url
    : "";
}
export function globalInfo(state) {
  return state.globalInfo;
}

export function getFavicon(state) {
  return state.globalInfo.favicon
    ? process.env.API_URL + state.globalInfo.favicon.formats.small.url
    : process.env.API_URL + "/favicon.ico";
}

export function menus(state) {
  return state.menus;
}

export function metaTitle(state) {
  return state.seo.metaTitle;
}

export function metaDescription(state) {
  return state.seo.metaDescription;
}

export function footerCopyright(state) {
  return state.globalInfo.footerCopyright
}