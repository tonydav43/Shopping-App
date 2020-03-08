<%- include("partials/header") %>
<div id="main-container" class="container">
	<div class="row">
		<div class="col-sm">
			<h1>New Shopping Item</h1>
		<form action="/todos" method="POST" id="new-todo-form">
			<div class="form-group">
				<label for="new-item"></label>
				<input type="text" name="todo[text]" class="form-control" placeholder="Enter you shopping item here" id="new-item" maxlength="50"> 
			</div>
			<button class="btn btn-success">Add to my shopping list</button>
		</form>
			
			<h1>Shopping Items To Buy</h1>
			<ul class="list-group" id="todo-list">
			<% todos.forEach(function(todo){ %>
				<li class="list-group-item">
					<form action="/todos/<%=todo._id%>" method="POST" class="edit-item-form">
						<div class="form-group">
							<label for="<%=todo._id%>"></label>
							<input type="text" value="<%= todo.text %>" name="todo[text]" class="form-control" id="<%=todo._id%>">
						</div>
						<button class="btn btn-success">Update the item</button>
					</form>
					<span class="lead">
						<%= todo.text %>
					</span>
					<div class="float-right">
						<button class="btn btn-sm btn-warning edit-button">Edit the item</button>
						<form style="display: inline" method="POST" action="/todos/<%=todo._id%>" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger delete-button">Its in my trolley</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
			<% }); %>
			</ul>
		</div>
	</div>
</div>

<%- include("partials/footer") %>
