class HomeController < ApplicationController
  def index
  end

  def login
  end

  def diary

    @post=Post.new
    @post.writer=params[:writer]
    @post.date=params[:date]
    @post.save

    @quiz = params[:q]
    
    if @quiz != "Voldemort"
      flash["err"] = "Not Invited"
      redirect_to "/"
    end
  
  end

  def create

    @post=Post.new
    @post.title=params[:title]
    @post.content=params[:content]
    @post.save
  end

  def read
    @posts=Post.all
  end

  def content
    @post=Post.find(params[:post_id])
  end

  def destory
    @post=Post.find(params[:post_id])
    @post.destroy
    redirect_to "/"
  end

  def edit
    @post=Post.find(params[:post_id])
    @post.title=params[:title]
    @post.content=params[:content]
    @post.save
  
    redirect_to "/"
  end
end