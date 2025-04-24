The Bitter Lesson
Rich Sutton
March 13, 2019
The biggest lesson that can be read from 70 years of AI research is that general methods that leverage
computation are ultimately the most effective, and by a large margin. The ultimate reason for this is
Moore's law, or rather its generalization of continued exponentially falling cost per unit of
computation. Most AI research has been conducted as if the computation available to the agent were
constant (in which case leveraging human knowledge would be one of the only ways to improve
performance) but, over a slightly longer time than a typical research project, massively more
computation inevitably becomes available. Seeking an improvement that makes a difference in the
shorter term, researchers seek to leverage their human knowledge of the domain, but the only thing
that matters in the long run is the leveraging of computation. These two need not run counter to each
other, but in practice they tend to. Time spent on one is time not spent on the other. There are
psychological commitments to investment in one approach or the other. And the human-knowledge
approach tends to complicate methods in ways that make them less suited to taking advantage of
general methods leveraging computation.  There were many examples of AI researchers' belated
learning of this bitter lesson, and it is instructive to review some of the most prominent.
In computer chess, the methods that defeated the world champion, Kasparov, in 1997, were based on
massive, deep search. At the time, this was looked upon with dismay by the majority of computerchess researchers who had pursued methods that leveraged human understanding of the special
structure of chess. When a simpler, search-based approach with special hardware and software proved
vastly more effective, these human-knowledge-based chess researchers were not good losers. They
said that ``brute force" search may have won this time, but it was not a general strategy, and anyway it
was not how people played chess. These researchers wanted methods based on human input to win
and were disappointed when they did not.
A similar pattern of research progress was seen in computer Go, only delayed by a further 20 years.
Enormous initial efforts went into avoiding search by taking advantage of human knowledge, or of
the special features of the game, but all those efforts proved irrelevant, or worse, once search was
applied effectively at scale. Also important was the use of learning by self play to learn a value
function (as it was in many other games and even in chess, although learning did not play a big role in
the 1997 program that first beat a world champion). Learning by self play, and learning in general, is
like search in that it enables massive computation to be brought to bear. Search and learning are the
two most important classes of techniques for utilizing massive amounts of computation in AI research.
In computer Go, as in computer chess, researchers' initial effort was directed towards utilizing human
understanding (so that less search was needed) and only much later was much greater success had by
embracing search and learning.
In speech recognition, there was an early competition, sponsored by DARPA, in the 1970s. Entrants
included a host of special methods that took advantage of human knowledge---knowledge of words,
of phonemes, of the human vocal tract, etc. On the other side were newer methods that were more
statistical in nature and did much more computation, based on hidden Markov models (HMMs).
Again, the statistical methods won out over the human-knowledge-based methods. This led to a major
change in all of natural language processing, gradually over decades, where statistics and
computation came to dominate the field. The recent rise of deep learning in speech recognition is the
most recent step in this consistent direction. Deep learning methods rely even less on human
knowledge, and use even more computation, together with learning on huge training sets, to produce
dramatically better speech recognition systems. As in the games, researchers always tried to make
systems that worked the way the researchers thought their own minds worked---they tried to put that
knowledge in their systems---but it proved ultimately counterproductive, and a colossal waste of
2/3/22, 9:31 PM The Bitter Lesson
www.incompleteideas.net/IncIdeas/BitterLesson.html 2/2
researcher's time, when, through Moore's law, massive computation became available and a means
was found to put it to good use.
In computer vision, there has been a similar pattern. Early methods conceived of vision as searching
for edges, or generalized cylinders, or in terms of SIFT features. But today all this is discarded.
Modern deep-learning neural networks use only the notions of convolution and certain kinds of
invariances, and perform much better.
This is a big lesson. As a field, we still have not thoroughly learned it, as we are continuing to make
the same kind of mistakes. To see this, and to effectively resist it, we have to understand the appeal of
these mistakes. We have to learn the bitter lesson that building in how we think we think does not
work in the long run. The bitter lesson is based on the historical observations that 1) AI researchers
have often tried to build knowledge into their agents, 2) this always helps in the short term, and is
personally satisfying to the researcher, but 3) in the long run it plateaus and even inhibits further
progress, and 4) breakthrough progress eventually arrives by an opposing approach based on scaling
computation by search and learning. The eventual success is tinged with bitterness, and often
incompletely digested, because it is success over a favored, human-centric approach.
One thing that should be learned from the bitter lesson is the great power of general purpose methods,
of methods that continue to scale with increased computation even as the available computation
becomes very great. The two methods that seem to scale arbitrarily in this way are search and learning.
The second general point to be learned from the bitter lesson is that the actual contents of minds are
tremendously, irredeemably complex; we should stop trying to find simple ways to think about the
contents of minds, such as simple ways to think about space, objects, multiple agents, or symmetries.
All these are part of the arbitrary, intrinsically-complex, outside world. They are not what should be
built in, as their complexity is endless; instead we should build in only the meta-methods that can find
and capture this arbitrary complexity. Essential to these methods is that they can find good
approximations, but the search for them should be by our methods, not by us. We want AI agents that
can discover like we can, not which contain what we have discovered. Building in our discoveries
only makes it harder to see how the discovering process can be done


传世经典blog，可惜网上一直没有什么好的译本。我将其翻译为中文，尽量流畅自然:

The Bitter Lesson

Rich Sutton

March 13,2019

过去70年的AI研究给予了我们一个深刻的教训: 那些充分发挥算力资源的通用方法，往往效果也是遥遥领先的好。究其本源，还是拜摩尔定律所赐(单位计算成本以指数速度持续下降)。大多数AI研究都是假设给予AI Agent恒定的算力条件，在这种情况下，注入人类知识可能是唯一提高性能的方法。但在稍长于一段经典研究项目的时间内，算力资源会不可避免地增加。为了短期内速出成果，研究者总是引入领域内的人类经验知识，从长远来看，实际上唯一重要的还是充分利用算力资源。表面看上去这两者并不对立，但在实践中往往无法兼得。在A方法上投入时间成本，就是意味着B方法没有投入时间成本。研究者的身心投入成本也是如此。采用人类经验的方法总是较为复杂，很难适配可以充分利用算力的通用方法。很多AI研究者迟迟才学到这一苦涩教训，来回顾一些经典案例还是很有教育意义的。

在计算机国际象棋领域，1997年击败世界冠军卡斯帕罗夫所采用的方法，是基于庞大的深度搜索技术。彼时，大多数研究者正致力于如何使用人类对国际象棋独特结构的经验理解，而对这简单直接的搜索算法大失所望。那些试图利用人类知识的研究者还在嘴硬，他们辩称暴力搜索或许此次侥幸成功，但它并非通用方法，也不符合人类下棋的方式。这些研究者渴望基于人类知识的方法能胜出，未果则倍感失落。

相似的情况也发生在了计算机围棋，只是晚了约二十年。起初，人们倾尽全力试图通过利用人类知识或游戏规则避免复杂的搜索，但一旦使用了有效的大规模搜索算法，所有这些努力要么显得多余，要么效果更烂。同样重要的是，自我对弈来学习Value Function，这一点在许多其他游戏乃至国际象棋中亦有体现（尽管在1997年首次战胜世界冠军的程序中，该方法并未发挥关键作用）。通过自我博弈来学习，以及一般的学习，如同搜索一样，能够有效利用大量计算资源。Search和learning是AI研究中利用大量计算的主要两类。无论是国际象棋还是围棋，研究者最初的尝试都是引入人类的经验来减少所需的搜索量，直到后来在全力投入search和learn后才取得了长足的进步。

语音识别领域中，DARPA在20世纪70年代赞助了一场早期竞赛。参赛者往往采用很多利用人类知识（如单词、音位、人类声道等）的特殊方法。相比之下，新一些的方法在大放异彩——基于隐马尔可夫的方法，统计学意义上更自然，也需要使用更多算力。又一次的，基于统计的方法战胜了基于人类知识的方法。这导致自然语言处理领域发生了根本性变化，统计与计算逐渐占据主导地位。近年来深度学习方法在语音识别中的崛起，正是沿着这一既定方向迈出的新的一步。深度学习方法更少依赖人类知识，更多地利用计算资源，并结合大规模训练集上的学习，从而极大地提升了语音识别系统的性能。正如此前在棋类游戏中，研究者总是试图构建符合他们思维习惯的系统——试图将他们的经验注入其中——但当摩尔定律让海量计算成为可能，并找到有效利用这些计算的方法时，这种做法最终被证明是事倍功半的，还会浪费研究者大量时间。

在计算机视觉领域，也出现了相似的现象。早期方法将视觉视为寻找edges, 或者generalized cylinders或基于SIFT特征的过程，但如今这一切都被摒弃。现代深度学习神经网络仅利用卷积和某些不变性的先验，就能表现优越。

这是一个深刻的教训。但是我们仍未彻底吸取这一教训，因为我们仍在不断重复同样的错误。要认清这一点并有效避免，我们必须深刻理解它。我们不得不从中学会：长期来看，将我们自认为的思维方式注入到AI中是行不通的。这一苦涩的教训基于历史观察：

1）研究者常常试图将人类知识注入进他们的Agent中；

2）这在短期内总能有所助益，可能效果令人比较满足；

3）但长期看，它会总是达到瓶颈，甚至阻碍进一步的进步；

4）真正的突破性的进展往往最终来自于反方向，即采用搜索和学习并扩大计算规模。

这样最终获得的成功有点苦涩，人们常常未能彻底消化它，因为它是在人类中心主义方法之上的胜利。

从这个苦涩的教训中，我们应当学到的第一点启示是通用方法的巨大威力，即便是面对计算资源的高速增长。搜索和学习似乎是两种能够任意扩展到更大规模的方法。

第二点启示是，人类经验知识总是相当复杂且无法被简化的；我们最好早点束手，不要徒劳去寻找简化人类知识的方法，比如用简单的方式去思考空间，目标，多agents，或者某种对称性。这是一个高度复杂，相当随机的世界，它们不应该是我们需要注入的内容，因为其复杂性无穷无尽；相反，我们要注入的是那些能捕捉任意复杂性的元方法。这些方法的关键在于能够找到良好的近似解，但求解过程应该是通过这些元方法，而不是通过我们的知识。注入我们的经验知识只会让探索的过程变得更加困难。

