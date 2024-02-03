export function fallbackCopyTextToClipboard(text: string) {
	const toast = useToast();

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
		toast.add({
			title: "Copiado",
			icon: "i-heroicons-clipboard",
			description: "Texto copiado para a área de transferência.",
		});
	} catch (err) {
		navigator.clipboard.writeText(text);

		toast.add({
			title: "Tentativa de cópia",
			icon: "i-heroicons-clipboard",
			description: "Texto copiado para a área de transferência.",
			color: "orange",
		});
	}

	document.body.removeChild(textArea);
}
