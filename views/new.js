<%- include("partials/header") %>

<div class="row">
	<div class="col-md-6 col-md-offset-3">
		<h1>New Item</h1>
		<form action="/todos" method="POST">
			<div class="form-group">
				<label>Item Text</label>
				<input type="text" name="todo[text]" class="form-control">
			</div>
			<button class="btn btn-primary">Create Item</button>
		</form>
	</div>
</div>

<<%- include("partials/footer") %>