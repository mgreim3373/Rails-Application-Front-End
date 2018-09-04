'use strict'

const RecipesTemplate = require('../templates/recipes.handlebars')
const RecipeTemplate = require('../templates/recipe.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onUpdateRecipe = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.id = data.id
  api.updateRecipe(data)
    .then(ui.updateRecipeSuccess)
    .catch(ui.updateRecipeFailure)
}

const onSelectRecipe = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  store.id = data.id
  api.selectRecipe()
    .then(selectRecipeSuccess)
    .catch(ui.selectRecipeFailure)
}

const selectRecipeSuccess = function (data) {
  console.log(data)
  $('#selectRecipe input[name="id"]').val('')
  const selectRecipeHtml = RecipeTemplate({ recipe: data.recipe })
  $('.content').html(selectRecipeHtml)
  $('.deleteRecipe').on('submit', onDeleteRecipe)
  $('.recipeUpdate').on('submit', onUpdateRecipe)
  $('.selectRecipe input[name="id"]').val('')
  $('.handlebars').removeClass('hide')
}

const onAddRecipe = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.addRecipe(data)
    .then(addRecipeSuccess)
    .catch(ui.addRecipeFailure)
}

const addRecipeSuccess = function (data) {
  $('#recipe input[name="id"]').val('')
  $('#recipe input[name="prep_time"]').val('')
  $('#recipe input[name="name"]').val('')
  $('#recipe input[name="cook_time"]').val('')
  $('#recipe input[name="serving_size"]').val('')
  $('#recipe input[name="pot_mode"]').val('')
  $('#recipe input[name="pot_pressure"]').val('')
  $('#recipe input[name="ingredient"]').val('')
  $('#recipe input[name="prep_instruction"]').val('')
  $('#recipe input[name="photo"]').val('')
}

const onDeleteRecipe = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data.id)
  store.id = data.id
  api.deleteRecipe(data)
    .then(ui.deleteRecipeSuccess)
    .catch(ui.deleteRecipeFailure)
}

const onShowRecipes = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.showRecipes(data)
    .then(showRecipeSuccess)
    .catch(ui.selectRecipeFailure)
}

const showRecipeSuccess = function (data) {
  const showRecipesHtml = RecipesTemplate({ recipes: data.recipes })
  $('.content').html(showRecipesHtml)
  $('.deleteRecipe').on('submit', onDeleteRecipe)
  $('.recipeUpdate').on('submit', onUpdateRecipe)
  $('.handlebars').removeClass('hide')
}

const addHandlers = () => {
  $('.recipeUpdate').on('submit', onUpdateRecipe)
  $('.deleteRecipe').on('submit', onDeleteRecipe)
  $('#selectRecipe').on('submit', onSelectRecipe)
  $('#showRecipes').on('submit', onShowRecipes)
  $('#recipe').on('submit', onAddRecipe)
}

module.exports = {
  addHandlers
}
