# create an blackchain in python

## prepare

python3.6+ / pip / flask / requests / postman

```
pip install Flask==0.12.2 requests==2.18.4
```

## create blockchain

```
//blockchain.py
class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
    def new_block(self):
        # Creates a new Block and adds it to the chain
        pass
    def new_transaction(self):
        # Adds a new transaction to the list of transactions
        pass
    @staticmethod
    def hash(block):
        # Hashes a Block
        pass
    @property
    def last_block(self):
        # Returns the last Block in the chain
        pass
```

```
// 块结构
  // 索引
  // 时间戳
  // 交易列表
  // 工作量证明
  // 上一个区块的hash值
block = {
  'index': 1,
  'timestamp': 1506057125.900785,
  'transactions': [
    {
      'sender': ''8527147fe1f5426f9dd545de4b27ee00,
      'recipient': 'a77f5cdfa2934df3954a5c7c7da5df1f',
      'aumount': 5
    }
  ],
  'proof': 324984774000,
  'previous_hash': '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
}
```

```
// 加入交易
class Blockchain(object):
    ...
    def new_transaction(self, sender, recipient, amount):
        """
        生成新交易信息，信息将加入到下一个待挖的区块中
        :param sender: <str> Address of the Sender
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the Block that will hold this transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })
        return self.last_block['index'] + 1
```

```
// 创建新块
def new_block(self, proof, previous_hash=None):
        """
        生成新块
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        # Reset the current list of transactions
        self.current_transactions = []
        self.chain.append(block)
        return block
```

## pow

工作量证明（proof of work）
找出一个符合特定条件的数字。
```
import hashlib
import json
from time import time
from uuid import uuid4
class Blockchain(object):
    ...
    def proof_of_work(self, last_proof):
        """
        简单的工作量证明:
         - 查找一个 p' 使得 hash(pp') 以4个0开头
         - p 是上一个块的证明,  p' 是当前的证明
        :param last_proof: <int>
        :return: <int>
        """
        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1
        return proof
    @staticmethod
    def valid_proof(last_proof, proof):
        """
        验证证明: 是否hash(last_proof, proof)以4个0开头?
        :param last_proof: <int> Previous Proof
        :param proof: <int> Current Proof
        :return: <bool> True if correct, False if not.
        """
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"
```

## define api interface

python flask框架是一个轻量级web应用框架。它可以把网络请求映射到相应函数。
需要创建的三个接口
- /transaction/new 创建一个交易并添加到区块
/mine            去执行挖掘新的区块的任务
/chain           返回整个区块链


## 运行区块链

### 注册节点

```
// 一致性（共识）
  // 需要添加2个接口
  // /nodes/register 接收url形式的新节点列表
  // /nodes/resolve 执行一致性算法，解决任何冲突，确保节点拥有正确的链。
from urllib.parse import urlparse
...
class Blockchain(object):
    def __init__(self):
        ...
        self.nodes = set()
        ...
    def register_node(self, address):
        """
        Add a new node to the list of nodes
        :param address: <str> Address of node. Eg. 'http://192.168.0.5:5000'
        :return: None
        """
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)
```

```
// 实现共识算法
// 规定最长、有效的链才是最终的链。
import requests
class Blockchain(object)
    ...
    def valid_chain(self, chain): // 检查是否是有效链
        """
        Determine if a given blockchain is valid
        :param chain: <list> A blockchain
        :return: <bool> True if valid, False if not
        """
        last_block = chain[0]
        current_index = 1
        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print("\n-----------\n")
            # Check that the hash of the block is correct
            if block['previous_hash'] != self.hash(last_block):
                return False
            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False
            last_block = block
            current_index += 1
        return True
    def resolve_conflicts(self): // 解决冲突
        """
        共识算法解决冲突
        使用网络中最长的链.
        :return: <bool> True 如果链被取代, 否则为False
        """
        neighbours = self.nodes
        new_chain = None
        # We're only looking for chains longer than ours
        max_length = len(self.chain)
        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']
                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain
        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self.chain = new_chain
            return True
        return False
```

```
// 添加2个路由
@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()
    nodes = values.get('nodes')
    if nodes is None:
        return "Error: Please supply a valid list of nodes", 400
    for node in nodes:
        blockchain.register_node(node)
    response = {
        'message': 'New nodes have been added',
        'total_nodes': list(blockchain.nodes),
    }
    return jsonify(response), 201
@app.route('/nodes/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflicts()
    if replaced:
        response = {
            'message': 'Our chain was replaced',
            'new_chain': blockchain.chain
        }
    else:
        response = {
            'message': 'Our chain is authoritative',
            'chain': blockchain.chain
        }
    return jsonify(response), 200
```

```
// 运行服务
pipenv run python blockchain.py
pipenv run python blockchain.py -p 5001
// 再使用postman测试该区块链
```