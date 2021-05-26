# Generate an image from a reference using a Genetic Algorithm

This project was mainly the occasion to start using React. To do so, I thought what kind of fun things I may do with it.
This reflexion took me one more time on Genetic Algorithm and I wondered if it was possible to rebuild an image from another one using a set of polygons.
 
As usual, I tried to make the project severless so I could take advantage of Github Pages to make the result easily available.

The website is available at [https://xavierfeltin.github.io/react_ag_image/](https://xavierfeltin.github.io/react_ag_image/) (Chrome "only")

## Global approach

First of all, a little remainder on genetic algorithms: [https://towardsdatascience.com/introduction-to-optimization-with-genetic-algorithm-2f5001d9964b](https://towardsdatascience.com/introduction-to-optimization-with-genetic-algorithm-2f5001d9964b)

For this subject, I needed to know if it has been aleady the playgrounds to other people and potentially a research field. Of course, it has been.
And it looked pretty trickery. Especially all the image comparison mathematics.

Since the main purpose was to discover React, I left the mathematics to external libraries which have already done the work and way better that I could have handled by myself in a respectful amount of time.

The application is using a web worker to delegate the processing outside of the main javascript thread to avoid blocking the user interface.

For the simulation, the application uses OffscreenCanvas to make the rendering in memory. This functionality is fully available to only a few of browsers. If you wish to try it out, I recommend you to use Chrome.

The application is articulated around three points:
- The original image loaded from its url
- The genetic algorithm configuration
- The simulation result displayed for each generation:
  - The image drawn from the polygons of the best individual
  - The simulation information (score, time of processing, ...)

All the parameters used in the genetic algorithm are available on the configuration:
- population size
- crossover strategy
- mutation strategy
- enabling the transparancy for drawing
- number of vertex for the polygons
- ...

## Fitness function
Here are the three different way to compute the similarity between two images used in this project :
- [Ssim library](https://github.com/obartra/ssim): it computes a score based on the structural similarity of the images.
- [Pixelmatch library](https://github.com/mapbox/pixelmatch): it computes a score based on the difference of color metrics between two images 
- The direct approach of summing the differences between each pixel of the images. (inspired from [https://chriscummins.cc/s/genetics/](https://chriscummins.cc/s/genetics/))

It is possible to enable one or several of them to compute a  global fitness. The final fitness is a ponderated sum of each approach.

## React
The UI is developped using React for a self study purpose.
It is using the [Chakra component library](https://chakra-ui.com) as well. It was helpful to speed up some UI developments and it was a good occasion for using a React component library at the same time.

The project helped me to dive into some of React mechanisms and understand its basics. The integration of a web worker and its synchronization with the rest of the application was a bit of a challenge.

The integration of Canvas and image rendering was a bit more complicated than I thought since it was slightly different from what I have done on other projects where Canvas was only used for rendering.

Thanks to [Ganlhi](https://github.com/ganlhi) for his directions and help on React.
