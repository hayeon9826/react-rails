class ObjectsController < ApiController
  PERMIT_MODELS = %i[user banner category image item].freeze
  before_action :set_object

  def index
    objects = @object_class.ransack(index_params)&.result&.page(params[:page])&.per(params[:per])
    render json: {
      objects: each_serialize(objects),
      total_count: objects&.total_count,
      total_pages: objects&.total_pages
    }
  end


  private 

  def set_object
    if PERMIT_MODELS.include?(params[:model_name]&.to_sym)
      @object_class = params[:model_name].classify.constantize
      @objects_name = params[:model_name].pluralize
    else
      raise ActiveRecord::RecordNotFound
    end
  end

  def index_params
    params.fetch(:q, {}).permit(@object_class::INDEX_PERMIT) if Object.const_defined?("#{@object_class}::INDEX_PERMIT", false)
  end

  def model_params
    params.require(:params[:model_name]).permit(@object_class::PERMIT_COLUMNS)
  end
end
