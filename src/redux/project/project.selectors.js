import {createSelector} from 'reselect';

const selectProject = state => state.project;


export const selectProjects= createSelector(
  [selectProject],
  project => project.projects
);
