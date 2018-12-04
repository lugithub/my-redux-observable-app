import { createSelector } from 'reselect';

export const getAdmin = state => state.admin;

export const getIsOpen = createSelector(getAdmin, admin => {
  return admin.isOpen;
});
