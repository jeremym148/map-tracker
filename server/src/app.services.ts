import * as turf from '@turf/turf';
import Coordinate  from './app.types'


/**
 * Generates a goal location within a 1 km radius of the current location.
 * @param current - The current location
 * @returns Coordinate
 */
export const generateGoal = (current: Coordinate): Coordinate => {
    const center = turf.point([current.lng, current.lat]);
    const radius = 1; // radius in kilometers
    const options = { units: "kilometers" as turf.Units};
    const circle = turf.circle(center, radius, options);
    const randomPoint = turf.randomPoint(1, { bbox: circle.bbox }).features[0].geometry.coordinates;
    return { lat: randomPoint[1], lng: randomPoint[0] };
  };

/**
 * Checks if the current position is close enough to the goal position.
 * @param current - The current Coordinate
 * @param goal - The goal coordinate
 * @returns boolean
 */
export const checkGoal = (
    current: Coordinate,
    goal: Coordinate
  ): boolean => {
    const from = turf.point([current.lng, current.lat]);
    const to = turf.point([goal.lng, goal.lat]);
    const distance = turf.distance(from, to); // distance in kilometers by default
    return distance < 0.01; // Assuming goal is reached if within 10 meters
  };
  