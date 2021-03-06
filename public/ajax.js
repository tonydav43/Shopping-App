// Create To Do Item
$("#new-todo-form").submit(function(e) {
	e.preventDefault();
	let toDoItem = $(this).serialize();
	$.post("/todos", toDoItem, (data) =>{
		$("#todo-list").append(
			`
			<li class="list-group-item">
					<form action="/todos/${data._id}" method="POST" class="edit-item-form">
						<div class="form-group">
							<label for="${data._id}"></label>
							<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="{data._id}">
						</div>
						<button class="btn btn-success">Legg til handlelisten</button>
					</form>
				<span class="lead">
				${data.text}
				</span>
					<div class="float-right">
						<button class="btn btn-sm btn-warning edit-button">Rediger</button>
						<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger delete-button">Gjort</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
			`
		)
		$("#new-todo-form").find(".form-control").val("");
	});
});

// Edit To Do Item
$("#todo-list").on("click", ".edit-button", function() {
	$(this).parent().siblings(".edit-item-form").toggle();
});

$("#todo-list").on("submit", ".edit-item-form", function(e) {
	e.preventDefault();
	let toDoItem = $(this).serialize();
	let actionUrl = $(this).attr("action")
	$originalItem = $(this).parent(".list-group-item");
	$.ajax({
		url: actionUrl,
		data: toDoItem,
		type: "PUT",
		originalItem: $originalItem,
		success: function(data) {
			this.originalItem.html(
				`
				<form action="/todos/${data._id}" method="POST" class="edit-item-form">
						<div class="form-group">
							<label for="${data._id}"></label>
							<input type="text" value="${data.text}" name="todo[text]" class="form-control" id="{data._id}">
						</div>
						<button class="btn btn-success">Update the item</button>
					</form>
					<span class="lead">
						${data.text}
					</span>
					<div class="float-right">
						<button class="btn btn-sm btn-warning edit-button">Rediger</button>
						<form style="display: inline" method="POST" action="/todos/${data._id}" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger delete-button">Gjort</button>
						</form>
					</div>
					<div class="clearfix"></div>
				`
			)
		} 
	});
});

// Delete To Do Item
$("#todo-list").on("submit", ".delete-item-form", function(e) {
	e.preventDefault();
	//let confirmResponse = confirm("Are you sure you have the shopping list item?"); if you want a confirmation message
	//if(confirmResponse) { if you want a confirmation message
		let actionUrl = $(this).attr("action");
		$itemTodelete = $(this).closest(".list-group-item")
		$.ajax({
			url: actionUrl,
			type: "DELETE",
			itemTodelete: $itemTodelete,
			success: function(data) {
				this.itemTodelete.remove();
			}
		});
	//} else { if you want a confirmation message
		//$(this).find("button").blur(); if you want a confirmation message that takes away the delete blur
	//}
}); 


