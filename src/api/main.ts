import axios from 'axios'

const drinksAPI = {
  methods: {
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
    search(query: String) {
      console.log(`${this.baseURL}search.php?s=${query}`)
      const result = axios
        .get(`${this.baseURL}search.php?s=${query}`)
        .then((response) => {
          return response.data.drinks
        })
        .catch((error) => console.error(error))
      return result
    },
  },
}

export default drinksAPI
