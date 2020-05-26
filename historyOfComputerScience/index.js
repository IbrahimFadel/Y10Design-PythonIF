/**
* dataMap will store the data for each timeline card.
* The keys will be: card-i
* The values are the objects in dataArray
* This map is propagated in the for loop under itemClicked
*/
const dataMap = new Map();

/**
 * This is an array containing the data for each card
 * Each object eventually gets inserted into the dataMap
 */
const dataArray = [
	{
		title: 'Alan Turing',
		elements: [
			{ h5: '1936' },
			{
				p:
					"In 1936-7, Alan Turing creates the 'Turing Machine'. It was a thought experiment to determine the limitations of computing. It is now considered the foundation of modern computing. The turing machine reads a program in the form of a \'tape\'. This tape consists of cells with a value of either 0 or 1. These values result in instructions, and the machine will do the proper action based on the instruction. This is exactly how modern computers work. Assembly provides a level of abstraction to better visualize the machine. Moving values to registers, reading them, etc.",
			},
			{ h5: '1941' },
			{
				p:
					"Alan Turing cracked the 'unbreakable' German enigma encryption in World War 2 by creating the first modern computer. The German military encrypted all of their messages with their enciphering machine called the Enigma Machine. The key was changed every day. The Allies needed a fast way to decrypt messages, and doing the calculations by hand simply wasn't working. Turing invented the \'Bombe\'. This computer was able to significantly speed up the process of finding the encryption key. With the machine, the allies were able to decrypt messages, even when the Germans changed it every day.",
			},
		],
		sources: [
			'https://www.livescience.com/29483-alan-turing.html',
			'https://plato.stanford.edu/entries/turing-machine',
			'https://www.iwm.org.uk/history/how-alan-turing-cracked-the-enigma-code'
		],
	},
	{
		title: 'NASA Computers',
		elements: [
			{ h5: '1963-69' },
			{ p: 'The moon landing would never have been possible without computers. The guidance system was powered by state of the art IBM computers. The computer needed to calculate the course towards the moon, and make adjustments in real time. It therefore had to control several physical parts of the spacecraft. Amazingly, the computer had an \'Interpreter\' which allowed for 5-7 virtual machines simultaneously in just 2kb or memory. This is an enormously small amount of memory.' },
			{ h5: 'Specs' },
			{ p: 'Initially, MIT\'s design required just 4 thousand words \(A word is 2 bytes, or 16 bits\) of fixed memory, and 256 words \(4,096 bits\) of erasable memory. The final design had 36 thousand words or fixed memory and 2 thousand words of erasable memory. The memory on the computer was amazingly physical ringed magnets around a wire. Positive/Negative magnetization of the ring would rotate them into 0/1 position.' }
		],
		sources: [
			'https://www.theatlantic.com/science/archive/2019/07/underappreciated-power-apollo-computer/594121/',
			'https://history.nasa.gov/computers/Ch2-5.html'
		],
	},
	{
		title: 'First Languages',
		elements: [
			{ h5: '1950s' },
			{
				p: 'Fortran, LISP, COBOL, and Assembly Languages begin to emerge. The allow programmers to more effectively use computers. Some are more high level (Fortran, LISP, COBOL), while others are as close to the metal as possible without being binary (Assembly).'
			},
			{
				p: ' Some higher level langues such as COBOL were criticized for their \'English-like\' syntax, which is extremely common nowadays. LISP was revolutionary, because it introduced automatic memory management -- something that we take for granted today. Assembly provides the most possible control of a computer without using 0s and 1s, however it has its disadvantages. The main issue with assembly, aside from readability, is that every processor has a slightly different instruction set, therefore, every processor architecture needed its own assembly language. This meant that an engineer might have known -- for example: ARM, MIPS, x86, x64.'
			},
			{
				p:
					'Overall, this period marks the end of using punch cards (binary) to program computers. English-like syntax can now be used.',
			},
		],
		sources: [
			'https://web.archive.org/web/20100715042920/http://www.math.grin.edu/~rebelsky/Courses/CS302/99S/Outlines/outline.02.html',
			'https://www.computerworld.com/article/2499721/arm-goes-64-bit-with-new-armv8-chip-architecture.html',
			'https://www.mips.com/products/architectures/mips64/'
		],
	},
	{
		title: 'Foundation Years',
		elements: [
			{ h5: 'Late 1960-70s' },
			{ p: 'In these years, some of the most fundamental programming paradigms become main stream. People debate over the use of \'goto\' statements. Eventually, it becomes labeled as bad design.' },
			{ p: 'One of the most influential langues ever, C (predecessor to C++), is created. C came with a great array of built in functionality, and complex data structures. Windows, Linux, and OSX are built with C. It also powers the Oracle Database, MySQL, and PostgreSQL. C is so popular because of its speed, and portability. It is essentially a portable assembly language. This is to say, you have the power of assembly without writing it for different CPU architecture. C also allowed for preprocessor definitions. These were all crucial aspects of arguably the single most impactful and important languages of all time.'},
			{ p: 'During these years, Simula, was invented, and brought with it the object oriented paradigm. ML gave us a statically typed, functional programming language. These paradigms are both widely used today as seen in languages such as Java and Javascript.' }
		],
		sources: [
			'https://www.toptal.com/c/after-all-these-years-the-world-is-still-powered-by-c-programming',
			'https://www.cl.cam.ac.uk/archive/mjcg/papers/HolHistory.pdf'
		]
	},
	{
		title: 'Cementing Paradigms',
		elements: [
			{ h5: '1980s' },
			{ p: 'During this time, languages like C++, Common Lisp, Matlab, Objective-C, and Perl came out. These built upon the ideas created in the 70s and cemented the paradigms of imperative programming. A bigger focus was placed on scalability by introducing structured units of code. This practice is known as object oriented programming.' },
			{ p: 'C++ was built off of C. C++ can be object oriented. It provides speed, support for pointers and lot\'s of libraries. It dominates the graphics/video game industry, as its speed is essential for realtime 3d rendering. Many other important systems and applications are made with c++ such as browsers, and compilers. This last point is important -- c++ is the mother of many modern languages. I, in fact am currently building a <a href="https://github.com/IbrahimFadel/sandscript" target="blanc">compiler</a> with c++.' }
		],
		sources: [
			'https://hackr.io/blog/features-uses-applications-of-c-plus-plus-language'
		]
	},
	{
		title: 'Internet Age',
		elements: [
			{ h5: '1990s' },
			{ p: 'The 90s saw the introduction of the internet. With this, Javascript gained tremendous popularity for being a very easy to learn \'scripting\' language that allowed people to harness the power of the web. Similar \'scripting\' languages such as Python gained popularity for their simplicity.' },
			{ p: 'Some other notable languages created in this time were Haskell, Visual Basic, Lua, R, Ruby, Java, and PHP. The last two may be two of the most important languages of this period. Java is still one of the most popular object oriented programming languages. PHP became a very popular for it\'s backend capabilities, and while it\'s being phased out of use, many big websites today still rely on it.' },
			{ p: 'In my opinion, the importance of this period lies mainly in Javascript. Javascript has evolved from simply making websites interactive, to being a tool used in fullstack development. ExpressJS allows the use of Javascript in building servers and RESTful apis. Typescript -- a syntactical superset of JS -- allows to write statically typed JS. NodeJS gives JS 100% backend functionality allowing people to make almost anything with Javascript. Anything from desktop applications with Electron, to games in the browser. It is an easy gateway for people to get into programming which is very important.' }
		],
		sources: [
			'https://gotechark.com/blog/importance-javascript/'
		]
	},
	{
		title: 'Modern Age',
		elements: [
			{ p: 'Rust, Go, Dart, Kotlin, Typescript, Swift, C#, and Scala are all very modern languages. They haven\'t quite been as widely adapted as some other languages, largely because they are so new. Rust, for example, has been around for just around a decade.' },
			{ p: 'In general, these languages are simply trying to improve upon existing languages. Rust for example is trying to be as fast as C++ but with safer memory. Typescript is a superset of Javascript with static typing.' },
			{ p: 'There\'s not much to say about the impact of these languages as they are all still very modern and not as widely adapted. Dart and Swift are very quickly taking market share in app development. Typescript is also one of the fastest growing \'languages\' out there, as more and more Javascript developers are transitioning to it.' }
		],
		sources: [
			'https://towardsdatascience.com/top-7-modern-programming-language-to-learn-now-156863bd1eec',
			'https://codewithandrea.com/articles/2018-12-27-dart-vs-swift-a-comparison/',
			'https://blog.codemagic.io/flutter-vs-swift/',
			'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html'
		]
	}
];

/**
 * HtmlCollection of the cards from the timeline
 */
const items = document.getElementsByClassName('timeline-content');

/**
 * Given the data from dataMap, generate the body of the modal for a given card
 */
const getHtml = ({ elements: els, sources }) => {
	let strings = [];
	for (const el of els) {
		const tag = Object.keys(el)[0];
		const text = Object.values(el)[0];
		strings.push(`<${tag}>${text}</${tag}>`);
	}

	if (sources.length > 0) {
		strings.push(`<h3>Sources/Further Reading</h3>`);
		let i = 1;
		for (const source of sources) {
			strings.push(`<a target="_blank" href=${source}>Source ${i}</a>`);
			i++;
		}
	}

	const html = strings.join('\n');
	return html;
};

/**
 * Callback for when a timeline item is clicked
 * Get the title, and body, then open a modal with sweetalert
 */
const itemClicked = (item, i) => {
	const itemsArr = [...items];
	const data = dataMap.get(`card-${itemsArr.indexOf(item)}`);

	const html = getHtml(data);

	Swal.fire({
		title: `${data['title']}`,
		html,
		customClass: {
			popup: 'popup-class',
		},
	});
};

/**
 * Keep track of the iterations to name the keys for the dataMap
 */
let i = 0;

/**
 * Propagate dataMap
 * Set the event listeners for each card
 */
for (const item of items) {
	dataMap.set(`card-${i}`, dataArray[i]);

	item.onclick = () => {
		itemClicked(item, i);
	};

	i++;
}
