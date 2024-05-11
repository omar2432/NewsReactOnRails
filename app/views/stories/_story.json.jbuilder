# _story.json.jbuilder
#json.extract! story, :id, :title, :description, :category_id, :image_id, :created_at, :updated_at

#if story.image_id.present?
 # image = Image.find(story.image_id)
 # json.image_data Base64.encode64(image.image) if image.present?
  # Add any other image attributes you want to include
#else
#  json.image_data nil
#end

#json.url story_url(story, format: :json)



# _story.json.jbuilder
json.extract! story, :id, :title, :description, :category_id, :created_at, :updated_at

if story.image.attached?
  json.image_url rails_blob_url(story.image)
  # Add any other image attributes you want to include
else
  json.image_url nil
end

json.url story_url(story, format: :json)
