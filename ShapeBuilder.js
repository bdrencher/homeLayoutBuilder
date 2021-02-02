/*********************************************************************************
 * @description contains functions that build svg rectangles, circles, arcs,
 * and lines.
 ********************************************************************************/
export class ShapeBuilder {

    /*********************************************************************************
     * @description A function that creates a rect object for an svg
     * @param length (integer)
     * @param height (integer)
     * @param startLocation (Location)
     ********************************************************************************/
    buildRectangle(length, height, startLocation) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", startLocation.x);
        rect.setAttribute("y", startLocation.y);
        rect.setAttribute("width", length);
        rect.setAttribute("height", height);
        rect.setAttribute("stroke", "black");
        rect.setAttribute("stroke-width", 2);
        rect.setAttribute("fill", "transparent");

        return rect;
    }

    /*********************************************************************************
     * @description A function that creates a circle object for an svg
     * @param radius (integer)
     * @param startLocation (Location)
     ********************************************************************************/
    buildCircle(radius, startLocation) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", startLocation.x);
        circle.setAttribute("cy", startLocation.y);
        circle.setAttribute("r", radius - 2);
        circle.setAttribute("fill", transparent);
        circle.setAttribute("stroke-width", 2);
        circle.setAttribute("stroke", "black");

        return circle;
    }

    /*********************************************************************************
     * @description a function that creates an arc of less than 180deg
     * @param radius (integer)
     * @param startLocation (Location)
     * @param endLocation (Location)
     ********************************************************************************/
    buildArc(radius, startLocation, endLocation) {
        let arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d = ["M", startLocation.x, startLocation.y,
                 "A", radius - 2, radius - 2, 0, 0, 0, endLocation.x, endLocation.y]; // Only using angles for less than 180deg
        d = d.join(" "); // form string for path instruction

        arc.setAttribute("d", d);
        arc.setAttribute("fill", transparent);
        arc.setAttribute("stroke-width", 2);
        arc.setAttribute("stroke", "black");

        return arc;
    }

    /*********************************************************************************
     * @description a function that returns a straight line for an svg
     * @param startLocation (Location)
     * @param endLocation (Location)
     ********************************************************************************/
    buildLine(startLocation, endLocation) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startLocation.x);
        line.setAttribute("x2", endLocation.x);
        line.setAttribute("y1", startLocation.y);
        line.setAttribute("y2", endLocation.y);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", 2);

        return line;
    }

    /*********************************************************************************
     * @description a function that returns an array of short lines to create a vertical
     * or horizontal dashed line
     * @param startLocation (Location)
     * @param endLocation (Location)
     ********************************************************************************/
    buildDashedLine(startLocation, endLocation) {
        let lines = [];
        let lengthX = startLocation.x - endLocation.x;
        let lengthY = startLocation.y - endLocation.y;

        let maxLength = lengthX > lengthY ? lengthX : lengthY;
        let numberOfDashes = Math.floor(maxLength / 10);
        let spacing = 5;
        
        for (let i = 0; i < numberOfDashes; i++) { // dashed lines are only horizontal or vertical
            let dash = document.createElementNS("http://www.w3.org/2000/svg", "line");
            if (lengthX > lengthY) {
                let startPoint = startLocation.x + i * spacing * 2; // skip gaps
                dash.setAttribute("x1", startPoint);
                dash.setAttribute("x2", startPoint + spacing);
                dash.setAttribute("y1", startLocation.y);
                dash.setAttribute("y2", endLocation.y);
            } else {
                let startPoint = startLocation.y + i * spacing * 2; // skip gaps
                dash.setAttribute("x1", startLocation.x);
                dash.setAttribute("x2", endLocation.x);
                dash.setAttribute("y1", startPoint);
                dash.setAttribute("y2", startPoint + spacing);
            }

            dash.setAttribute("stroke", "black");
            dash.setAttribute("stroke-width", 2);

            lines.push(dash);
        }

        return lines;
    }
}