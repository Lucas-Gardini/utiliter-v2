export function fallbackCopyTextToClipboard(text: string) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		document.execCommand("copy");
	} catch (err) {
		navigator.clipboard.writeText(text);
	}

	document.body.removeChild(textArea);
}
