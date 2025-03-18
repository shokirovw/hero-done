import { create } from "zustand";

export const useUserData = create((set) => ({
  data: null,
  loading: false,
  error: null,


  load: async () => {
    set({ loading: true, error: null });

    try {
      // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      // const result = await response.json();

      let userdata = {
        me: {
          person_id: "0",
          name: "Pres. Aleksandrov",
          email: "r.aleksandrov@newuu.uz", 
          username: "@aleksandrov", 
          avatar_id: 2
        },
        friends: {
          "1": { name: "Shohjahon", email: "sh.karimberganov@newuu.uz", username: "@shohjahon", avatar_id: 1, person_id: "1" },
          "2": { name: "Doniyor", email: "d.soxibov@newuu.uz", username: "@doniyor", avatar_id: 0, person_id: "2" },
          "3": { name: "Umar", email: "u.toshqulov@newuu.uz", username: "@umar", avatar_id: 1, person_id: "3" },
          "4": { name: "Muhammadiyor", email: "m.shokirov@newuu.uz", username: "@shokirov", avatar_id: 0, person_id: "4" },
          "5": { name: "Farhod", email: "f.joniqulov@newuu.uz", username: "@farhod", avatar_id: 1, person_id: "5" }
        }
      }

      set({ data: userdata, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch data", loading: false });
    }
  },
}));