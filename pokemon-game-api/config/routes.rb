Rails.application.routes.draw do
  # resources :scores
  get "/scores", to: "scores#index"
  post "/scores", to: "scores#create"
  # resources :users
  get "/users", to: "users#index"
  post "/users", to: "users#create"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
