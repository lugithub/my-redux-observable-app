import { createSelector } from 'reselect';

const getAdmin = state => state.admin;
const adminIsOpen = admin => admin.isOpen;

export const getIsOpen = createSelector(getAdmin, adminIsOpen);
