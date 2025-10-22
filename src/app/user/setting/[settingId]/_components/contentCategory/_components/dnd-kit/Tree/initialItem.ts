import { CategoryType } from "@/interfaces/category-type";
import { TreeItems } from "./types";

export const initialItems: TreeItems = [
  {
    id: 1,
    name: 'Home',
    pos: 0,
    count: 0,
    children: [],
  },
  {
    id: 2,
    name: 'Collections',
    pos: 1,
    count: 0,
    children: [
      {id: 3, name: 'Spring', pos: 0, children: [], count: 0},
      {id: 4, name: 'Summer', pos: 1, children: [], count: 0},
      {id: 5, name: 'Fall', pos: 2, children: [], count: 0},
      {id: 6, name: 'Winter', pos: 3, children: [], count: 0},
    ],
  },
  {
    id: 7,
    name: 'About Us',
    pos: 0,
    count: 0,
    children: [],
  },
  {
    id: 8,
    name: 'My Account',
    pos: 0,
    count: 0,
    children: [
      {id: 9, name: 'Addresses', pos: 0, children: [], count: 0},
      {id: 10, name: 'Order History', pos: 1, children: [], count: 0},
    ],
  },
];


export const categoriesExample : CategoryType[] = [
  {
    id: 1,
    categoryName: "카테고리1",
    pos: 1,
    user: {
      id: 1,
      email: "user1@example.com",
      createdAt: "2021-01-01",
    },
    tempPostCount: 0,
    postCount: 0,
    children: [
      {
        id: 3,
        categoryName: "카테고리3",
        pos: 2,
        user: {
          id: 1,
          email: "user1@example.com",
          createdAt: "2021-01-01",
        },
        tempPostCount: 0,
        postCount: 0,
        children: [],
      },
    ],
  },
  {
    id: 2,
    categoryName: "카테고리2",
    pos: 2,
    user: {
      id: 1,
      email: "user1@example.com",
      createdAt: "2021-01-01",
    },
    tempPostCount: 0,
    postCount: 0,
    children: [],
  },
];