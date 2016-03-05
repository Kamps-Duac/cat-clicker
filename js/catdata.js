
// Model
var data = {
	currentCat: null,
	cats: [{
		id: 1,
		name: "Beach Cat",
		catImgSrc: "img/Beach Cat.jpg",
		clicks: 0
	}, {
		id: 2,
		name: "Burrito Cat",
		catImgSrc: "img/Burrito Cat.jpeg",
		clicks: 0
	}, {
		id: 3,
		name: "Professor Cat",
		catImgSrc: "img/Professor Cat.jpg",
		clicks: 0
	}]
};

// Controller
var controller = {
	init: function() {
		controller.setCurrentCat(data.cats[0]);

		catImgView.init();
		catListView.init();
		catAdminView.init();
	},

	getCurrentCat: function() {
		return data.currentCat;
	},

	getCats: function() {
		return data.cats;
	},

	setCurrentCat: function(cat){
		data.currentCat = cat;
	},

	addOneClick: function() {
		data.currentCat.clicks++;
	},

	refreshViews: function() {
		catImgView.render();
		catAdminView.render();
	}
};

// View
var catImgView = {
	init: function() {
		this.clickCounterElem = $("#clkCount");
		this.catListElem = $("#catList");
		this.catImageElem = $("img#selectedCat");
		this.catNameElem = $("clkPicName");

		// Add click event for Cat Picture
		this.catImageElem.click(function() {
			controller.addOneClick();
			controller.refreshViews();
		});
		this.catImageElem.mousedown(function() {
			$(this).css("opacity", 0.5);
		});
		this.catImageElem.mouseup(function() {
			$(this).css("opacity", 1);
		});

		// Render the view on load
		this.render();
	},

	render: function() {
		// Update the DOM elements with Current Cat data
		var currentCat = controller.getCurrentCat();
		if (currentCat !== null){
			this.clickCounterElem.text(currentCat.clicks);
			this.catNameElem.text(currentCat.name);
			this.catImageElem.attr("src",currentCat.catImgSrc);
			$("#clickCountDisplay").show();
			$("#catList>li").removeClass("active");
		}
		
	}
};

var catListView = {
	init: function() {
		this.catListElem = $("#catList");
		//this.currentCat = data.cats[1];
		this.render();
	},

	render: function() {
		var cat, buttonElem, i;

		var cats = controller.getCats();

		function generateCatClickHandler(catCopy) {
			return function() {
				controller.setCurrentCat(catCopy);
				catImgView.render();
				controller.refreshViews();
			};
		}

		for (i = 0; i < cats.length; i++) {
			cat = cats[i];

			// Here create nested element <li><a></a></li>
			buttonElem = document.createElement('button');
			buttonElem.className += 'btn btn-default';
			buttonElem.textContent = cat.name;

			buttonElem.addEventListener('click', (generateCatClickHandler(cat)));
			this.catListElem.append(buttonElem);
		}
	}
};

var catAdminView = {
	init: function() {
		this.catAdminBtn = $("#catAdminBtn");
		this.catNameFld = $("#catNameFld");
		this.catImgUrlFld = $("#catImgUrlFld");
		this.catClickCounterFld = $("#catClickCounterFld");

		this.catAdminBtn.click(function() {
			$("#adminForm").toggle();
		});

		this.render();
	},

	render: function() {
		var currentCat = controller.getCurrentCat();

		this.catNameFld.val(currentCat.name);
		this.catImgUrlFld.val(currentCat.catImgSrc);
		this.catClickCounterFld.val(currentCat.clicks);
	}
};

controller.init();

function generateCatClickHandler(catCopy) {
	return function() {
		controller.setCurrentCat(catCopy);
		catImgView.render();
	};
}