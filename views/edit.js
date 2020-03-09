<%- include("partials/header") %>

<div class="row">
	<div class="col-md-6 col-md-offset-3">
		<h1>Edit Item</h1>
		<form action="/todos/<%=todo._id%>?_method=PUT" method="POST">
			<div class="form-group">
				<label>Item Text</label>
				<input type="text" value="<%= todo.text %>" name="todo[text]" class="form-control">
			</div>
			<button class="btn btn-primary">Update Item</button>
		</form>
	</div>
</div>

<%- include("partials/footer") %>