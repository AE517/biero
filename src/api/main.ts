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
          return response.data.drinks
        })
        .catch((error) => console.error(error))
    },
    async filter(param: String, query: String): Promise<Array<object>> {
      return await axios
        .get(`${this.baseURL}filter.php?${param}=${query}`)
        .then((response) => {
          return response.data.drinks
        })
        .catch((error) => console.error(error))
    },
    async list(type: String) {
      return await axios
        .get(`${this.baseURL}list.php?${type.charAt(0)}=list`)
        .then((response) => {
          return response.data.drinks
        })
        .catch((error) => console.error(error))
    },
    async lookup(drinkID: String) {
      return await axios
        .get(`${this.baseURL}lookup.php?i=${drinkID}`)
        .then((response) => {
          return response.data.drinks[0]
        })
        .catch((error) => console.error(error))
    },
  },
}

export default API
