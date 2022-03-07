// import axios from "axios";

import { random } from "@/utils/helpers";

const state = {
  response: {},
  posts: [
    {
      id: 1,
      title: "Title 1",
      body: "Body 1",
      created_at: "2022-03-01",
    },
    {
      id: 2,
      title: "Title 2",
      body: "Body 2",
      created_at: "2022-03-01",
    },
    {
      id: 3,
      title: "Title 3",
      body: "Body 3",
      created_at: "2022-03-01",
    },
  ],
};
const getters = {
  single:
    ({ posts }) =>
    (id) => {
      return posts.find((post) => post.id == id) || null;
    },
  all({ posts }) {
    return posts;
  },
  response({ response }) {
    return response;
  },
};
const mutations = {
  setResponse(state, payload) {
    state.response = payload;
  },
  setAll(state, posts) {
    state.posts = posts;
  },
  setSingle(state, posts) {
    state.posts.push(posts);
  },
  create: (state, posts) => {
    state.posts.push(posts);
  },
  update: (state, { post }) => {
    const index = state.posts.findIndex((item) => item.id === post.id);
    state.posts.splice(index, 1, post);
  },
  delete: (state, post) => {
    const index = state.posts.findIndex((item) => item.id === post.id);
    console.log("--- Here delete -------");
    console.log(index);
    state.posts.splice(index, 1);
  },
};
const actions = {
  loadAll({ commit }, payload = {}) {
    console.log(payload);

    const id = random();

    commit("setSingle", {
      id: id,
      title: "Title " + id,
      body: "Body " + id,
      created_at: "2022-03-01",
    });

    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get("/api/posts", {
    //         params: {
    //           page: payload.page || null,
    //           search: payload.search || null,
    //         },
    //       })
    //       .then(({ data }) => {
    //         commit("setResponse", data);
    //         commit("setAll", data.data);
    //         resolve(data);
    //       })
    //       .catch((error) => reject(error));
    //   });
  },

  // loadAll({ commit }, payload = {}) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get("/api/posts", {
  //         params: {
  //           page: payload.page || null,
  //           search: payload.search || null,
  //         },
  //       })
  //       .then(({ data }) => {
  //         commit("setResponse", data);
  //         commit("setAll", data.data);
  //         resolve(data);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // },
  //
  // loadSingle({ commit }, id) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`/api/posts/${id}`)
  //       .then(({ data }) => {
  //         commit("setResponse", data);
  //         commit("setSingle", data);
  //         resolve(data);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // },
  // create({ commit }, data) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post("/api/posts", data)
  //       .then(({ data }) => {
  //         commit("create", data);
  //         resolve(data);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // },
  // update({ commit }, { id, data }) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .put(`/api/posts/${id}`, data)
  //       .then(({ data }) => {
  //         commit("update", {
  //           index: getters.findIndex(state, data),
  //           post: data,
  //         });
  //         resolve(data);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // },
  // delete({ commit }, post) {
  // TODO: rewrite confirm on something else
  /* eslint-disable-next-line */
    //     if (confirm('Вы уверены что хотите удалить post?')) {
  //   axios
  //     .delete("/api/posts/" + post.id, post)
  //     .then((response) => {
  //       commit("delete", { index: getters.findIndex(state, post) });
  //     })
  //     .catch((error) => reject(error));
  // }
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
