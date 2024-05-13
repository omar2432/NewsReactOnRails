# _story.json.jbuilder
json.extract! story, :id, :title, :description, :category_id, :created_at, :updated_at

if story.image.attached?
  json.image_url rails_blob_url(story.image)
else
  json.image_url nil
end

json.url story_url(story, format: :json)
