# introduction to smart contracts

这是官网文章的意译版。

## a simple smart contract

让我们从一个基本的例子开始。这个例子设置了一个暴露给别的交易的变量。如果你现在还不太了解它，没关系，我们会在接下来的教程中学习。

### storage example

```
pragma solidity >=0.4.0 <0.7.0

contract SimpleStorage {
  uint storedData;
  funtion set(uint x) public {
    storedData = x;
  }
  function get() public view return (uint) {
    return storedData;
  }
}
```

第一行是告诉你使用大于等于0.4.0小于0.7.0版本的solidity编译。这是为了确保正确编译。pragma是一个关于如何对待源码的通用的编译指令。
交易是一个solidity写的功能的集合。包括在ethereum里的特定位置的数据。设置storedData为uint类型。又定义也set/get方法，分别用于设置数据、得到数据。
得到静态数据时不需要使用`this.`前缀。
这个交易档没有做设置数据的权限，即任何人都可以修改数据。我们会在下面的步骤中设置修改仅限。

**警告**

使用Unicode文本时要小心。它们看起来很相似，但可能有不同的代码点，因此会被编码为不同的字节数组里。

**提示**

所有的标识符（交易名、方法名、变量名……）严格使用ASCII编码。它们适合使用文本变量保存为UTF-8格式。

### subcurrency example

下面的例子是最简单的一个加密货币的例子。这个合同只允许创建者创建新的硬币。任何人只需要ethereum的密钥对（不需要用户名、密码）都可以发送硬币。

```
pragma solidity >=0.5.0 <0.7.0
contract Coin {
  //public 关键字让变量可以被别的合同取得。
  address public minter;
  mapping (address => uint) public balance;
  // event 允许监听你定义的指定的合同改变的行为。
  event Sent(address from, address to, uint amount);
  // constructor 只在合同被被创建进执行。
  constructor() public {
    minter = msg.sender
  }
  // 只能由合同的创建者调用。发送一定数量的新创建的硬币到一个地址。
  function mint(address receiver, uint amount) public {
    require(msg.sender == minter);
    require(amount < 1e60)
    balance[receiver] += amount
  }
  // 从任意一个执行者发送一定数量的已经存在的硬币到一个地址。
  function send(address receiver, uint amount) public {
    require(amount <= balances[msg.sender], 'Insufficient balance')
    balances[msg.sender] -= amount
    balances[receiver] += amount
    emit Sent(msg.sender, receiver, amount)
  }
}
```

这个合同介绍了一些新概论，让我们通过它一个一个地学习。
`address public minter`定义了一个address类型的变量minter.address类型是160位长度的数据，它不允许任何算法操作。它适合去保存合同的地址，或属于外部账户的公钥的hash。
`public`可以使用在该合同外取得该变量的值。若没有`public`,则别的合同不能取得该变量。若忽视`ignore/ivew`则可以方法被编译等价于：`function minter () enternal view returns (address) {return minter};`
你可以添加你喜欢的，不重复的变量名、方法名。编译器会帮你生成相同名称的方法、变量。
`mapping (address => uint) public balances`.它使用了public修饰静态变量，而且还使用复杂的数据类型。mapping把address们映射到uint。
mapping可以被看作是哈希表，该哈希表是被初始化过的。这们每个键就是在开始时已经存在。但是即不可以得到mapping中的全部的key，也不可能得到全部的value。记录你添加的key,或在需要它地方使用它。有一个更好的方法：使用一个列表、使用更合适的数据类型。
在mapping情况下使用要public创建 getter function看起来更复杂。如下：
```
function balances (address _account) external view returns (uint) {
  return balances[_account]
}
```
你可以使用该方法去请求一个账户的余额。
`event Sent(address from, address to, uint amount)`使用'event'创建一个事件，在sent方法中使用。以太访客户端就像一个web app。它可以监听区块链上触发的这些事件，不需要太多成本。一旦被触发，监听者接收的参数有from/to/amount。这样使用跟踪事务成为可能。
你可以使用以下js代码监听这个事件，它使用web3.js创建了一个Coin Contract对象。任意用户都可以调用`balances`方法。

```
Coin.Sent().watch({}, '', function (error, result) {
  if (!error) {
    console.log(`Coin transfer: ${result.args.amount} coins were sent from ${result.args.from} to ${result.args.to}.`)
    console.log(`Balances now: \n Sender: ${Coin.balances.call(result.args.from)} Receiver: ${Coin.balances.call(result.args.to)}`)
  }
  })
```

constructor是创建合同时的特殊函数，它不能在创建合约后执行。本例中它永久保存着创建人的地址。msg变量（包括tx/block）是一个特殊的全局变量。它允许访问区块链的属性，msg.sender总是当前函数的调用地址。
这个文本被标记于这个合同，并且用户、合同可以调用mint/send.
mint方法将一些新创建的硬币发送给另一个地址。require方法定义了一些条件，若这满足条件则恢复所有改变。在此例中，`require(msg.sender == minter)`确保创建者可以调用mint。`require(amount < 1e60)`确保最大的数量限制。这将确保不会发生溢出错误。
任意一个有coin的用户都可以调用send方法。若发送者没有足够的硬币，会触发require的条件，因此会出现errro提示。

**提示**

若你使用合同向一个地址发送硬币，当你在区块链探索者上发现一个地址时你不用明白任何事件，因为只会记录在这个合同中的数据保存中你发送的硬币和改变的余额。使用事件，你可以创建一个区块链探索者，它可以跟踪事务和新创建的硬币。但是你必须检查硬币合同地址不是硬币拥有者的合同地址。

## blockchain basics

区块链的概念对于程序员来说不是太难。原因是最难的（mining, hasing, elliptic-curve cryptography, peer-to-peer network....）已经被平台提供了。若你已经会提供这些功能的方法，则你就不用关心它们深层次的逻辑。

### transactions

区块链的数据是全局共享的。即每个连接网络的人都可以读取数据。若你修改数据，则必须创建一个接受已有的交易的交易。这个修改事务不会被通过。因此，你的交易数据不可被别的交易修改。
这里有一个例子。想象一个显示所有账户的电子货币的表格。若你想从一个账户转移一些货币到另一个账户。数据的交易性质决定了：从一个账户减去后总是在另一个账户上添加。因此，不管出于什么原因，不可能只在某账户上添加货币。
因此，交易总是通过发起者加密签名。这种方法有力的保存了数据的特定修改。在一个电子货币的例子中，一个简单的验证方法，只有有账户key的人才能把钱转走。

### blocks

最主要的障碍是“双花”（double-spend attack）...
这个问题的抽象答案是，你不必在意。将为您选择一个全球接受的事务顺序，从而解决冲突。事务将被绑定到所谓的“块”中，然后它们将被执行并分发到所有参与节点中。如果两个事务相互冲突，则第二个事务将被拒绝，而不是成为块的一部分。
区块成线形排列，所心得名区块链。链上每过一段时间添加一个区块，如以太访每隔约17s添加一个区块。
作为“顺序选择机制（挖掘）”的一部分。块都有可能被恢复，只有在末端的块会被恢复。在一个特定的块添加的块越多，该块被恢复的可能性越小。因此，你的事务可能会被恢复，甚至从区块链中删除。但是等待时间越长，被删除的可能性越小。

**提示**

不能保证事务被包含在下一个块或任何特定的未来块中，因为它不是由事务的提交者决定的，而是由采矿者决定事务被包含在哪个块中。
如果你想安排未来的合同调用，你可以使用alarm clock或者类似的oracle服务。

## the ethereum virtual machine

### overview

Ethereum Virtual Machine（EVM）是为智能合约运行的以太访环境。它不只是沙盒，而是一个真实的隔离环境。即：在里面运行代码不能访问网络、文件系统、其它进程。智能合约甚至限制了访问其它智能合约。

### accounts

在以太访里有2种账户。
1. external account: 分享相同的地址空间。控制密钥对。
2. external account: 与账户共同控制存储的代码。
创建合同时定义合同地址。公钥确定外部账户的地址。(派生自创建者地址和从该地址发送的事务数，即所谓的“nonce”)
不管帐户是否存储代码，EVM都对这两种类型一视同仁。
每个帐户都有一个持久的键值存储，将256位的单词映射到256位的单词存储。
此外，每个帐户都有一个Ether(确切地说，在“Wei”中，1 Ether是`10**18` Wei)，可以通过发送包含Ether的交易来修改它。

### transactions

事务是一个消息，从一个账户发送到另一个账户。（可以是空的也可以是相同的。）它可以包含二进制数据（使用payload）和Ether。\
若目标账户有代码，这些代码会把payload做为输入数据执行。
若目标账户没有被设置（不存在目标账户、目标账户为null），则创建一个新的账户。如上提到。合同地址不是0地址，而是

### transactions
### transactions
### transactions
### transactions
### transactions
### transactions
### transactions
