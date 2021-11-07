Rails.application.routes.draw do
  resources :games, only: [:index, :show, :create]
  resources :clues, only: [:index, :show]
  resources :categories, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
