class BannerSerializer < Panko::Serializer
  attributes :id, :name, :image, :status, :is_external, :position, :link, :banner_type, :created_at, :updated_at
  # delegate :image_path, to: :object

  has_one :image, serializer: ImageSerializer
end