const API_PREFIX = '/api/v1';
export default {
  WINS_PATH: '/wins',
  ROLES_PATH: '/roles',
  SUMMARY: '/summary',
  SETTINGS_PATH: '/settings',
};

export const draggableTypes = {
  PREVIEW_TAB_BAR: 'preview tab bar',
  PREVIEW_CONTENT_CARD: 'preview content card',
};

export const PREVIEW_CONTENT_TYPES = {
  NAME: 'name',
  ADDRESS: 'address',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
}

export const API_ENDOINTS = {
  GET_ROLES: `${API_PREFIX}/jobs`,
}
