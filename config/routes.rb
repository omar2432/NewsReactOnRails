# frozen_string_literal: true

Rails.application.routes.draw do
  resources :stories
  devise_for :writers, skip: :registrations
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root "pages#index"

  #get "simple", to: "pages#simple"

  get "Trending", to: "pages#index"
  get "Sports", to: "pages#index"
  get "Entertainment", to: "pages#index"

  # React Router needs a wildcard
  get "react-router(/*all)", to: "pages#index"

  
  mount ActionCable.server => "/cable"
end
