import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

// styles 
import './Recipe.css'

function Recipe() {
      const {id} = useParams()
      const url = "http://localhost:3000/recipes/" +id
      const {error,isPending,data:recipe}=useFetch(url)


  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'> Loading ...</p>}
      {recipe && (

        <>
          <h2 className='page-tile'>{recipe.tile}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing=><li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>

        </>
      )}
      
      
    </div>
  )
}

export default Recipe
