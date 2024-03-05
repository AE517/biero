import axios from 'axios'

const API = {
  methods: {
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
    async search(param: String, query: String) {
      return await axios
        .get(`${this.baseURL}search.php?${param}=${query}`)
        .then((response) => {
          return response.data.drinks
        })
        .catch((error) => console.error(error))
    },
    async random() {
      return await axios
        .get(`${this.baseURL}random.php`)
        .then((response) => {
          response.data.drinks
        })
        .catch((error) => console.error(error))
    },
    async filter() {},
    async list(type: String) {
      return await axios
        .get(`${this.baseURL}list.php?${type.charAt(0)}=list`)
        .then((response) => {
          return response.data.drinks
        })
        .catch((error) => console.error(error))
    },
  },
}

export default API
