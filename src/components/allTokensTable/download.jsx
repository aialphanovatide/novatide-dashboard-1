import { saveAs } from "file-saver";
import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TextRun,
    ExternalHyperlink,
    ImageRun,
    HorizontalPositionRelativeFrom,
    VerticalPositionRelativeFrom
} from "docx";

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to format the title by replacing underscores with spaces and capitalizing the first letter
const formatTitle = (title) => {
    if (title) {
        return capitalizeFirstLetter(title.replace(/_/g, ' '));
    }
}


function formatNumber(number) {
    // Check if the number is an integer or decimal
    if (Number.isInteger(number)) {
      // Format integer numbers with thousands separators
      return number.toLocaleString();
    } else {
      // Split the number into integer and decimal parts
      let parts = number.toLocaleString().split('.');
      // Format integer part with thousands separators
      parts[0] = parts[0].replace(/,/g, '');
      parts[0] = parseInt(parts[0]).toLocaleString();
      // Join the integer and decimal parts and return
      return parts.join('.');
    }
  }



export default async function createDocument(item) {
    const excludedKeys = ["success", "id", "gecko_id", "symbol", "created_at", "logo"];

    const document = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        text: item.tokenname,
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 500,
                        },
                        border: {
                            bottom: {
                                color: "auto",
                                space: 1,
                                style: "single",
                                size: 6,
                            },
                        },
                    }),
                   
                    ...await Promise.all(Object.entries(item).map(async ([key, value]) => {
                        if (!excludedKeys.includes(key)) { // Check if the key is not in the excludedKeys list
                            let content;
                            if (typeof value === 'string' && value.startsWith('https')) {
                                content = new ExternalHyperlink({
                                    children: [
                                        new TextRun({
                                            text: value,
                                            bold: true,
                                            size: 24,
                                            style: "Hyperlink",
                                        }),
                                    ],
                                    link: value,
                                });
                            } else {
                                content = new TextRun({
                                    text: `${typeof value === 'number' ? formatNumber(value) : (value || "N/A")}`,
                                    size: 24,
                                });
                            }
                            return new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${formatTitle(key)}: `,
                                        bold: true,
                                        size: 24,
                                    }),
                                    content,
                                    new TextRun({
                                        text: '\n',
                                        size: 24,
                                        break: 1,
                                    })
                                ],
                            });
                        }
                    }).filter(paragraph => paragraph)), // Filter out undefined values
                ],
            },
        ],
    });

    const blob = await Packer.toBlob(document);
    saveAs(blob, `${item.tokenname}.docx`);
    return 'Document generated successfully';
}