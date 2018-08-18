//Adapted from the Internet
// function intersection(a0x, a0y, a1x, a1y, b0x, b0y, b1x, b1y)
// {
//     var axDiff, ayDiff, bxDiff, byDiff;
//     axDiff = a1x - a0x;     ayDiff = a1y - a0y;
//     bxDiff = b1x - b0x;     byDiff = b1y - b0y;
//     abxDiff = a0x - b0x;    abyDiff = a0y - b0y;

//     var denominator = -bxDiff * ayDiff + axDiff * byDiff

//     var s, t;
//     s = (-ayDiff * abxDiff + axDiff * abyDiff) / denominator;
//     t = ( bxDiff * abyDiff - byDiff * abxDiff) / denominator;

//     if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
//     {
//         return [a0x + (t * axDiff), a0y + (t * ayDiff)];
//     }

//     return null; // No collision
// }

// function intersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) { var s1_x, s1_y, s2_x, s2_y; s1_x = p1_x - p0_x; s1_y = p1_y - p0_y; s2_x = p3_x - p2_x; s2_y = p3_y - p2_y; var s, t; s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y); t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
//     if (s >= 0 && s <= 1 && t >= 0 && t <= 1) { // Collision detected
//         var intX = p0_x + (t * s1_x);
//         var intY = p0_y + (t * s1_y);
//         return [intX, intY];
//     } return null; // No collision
// }

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersection(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return null
    }

    var denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
    if (denominator === 0) {
        return null
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        // return null
    }

  // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return [x, y]
}

module.exports = intersection